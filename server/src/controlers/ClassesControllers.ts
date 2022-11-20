import { Request, Response } from "express";
import database from "../database/connection";
import convertHourToMinutes from "../utils/covertHourToMinutes";

type IScheduleItem = {
  week_day: number;
  from: string;
  to: string;
};

class ClassesController {
  async index(request: Request, response: Response) {
    const filters = request.query;

    const subject = filters.subject as string;
    const weekDay = filters.week_day as string;
    const time = filters.time as string;

    if (!subject || !weekDay || !time) {
      return response
        .status(400)
        .json({ error: "Missing filters search classes" });
    }

    const timeInMinutes = convertHourToMinutes(time);

    try {
      const classes = await database("classes")
        .whereExists(function () {
          this.select("class_schedule.*")
            .from("class_schedule")
            .whereRaw("`class_schedule`.`class_id` = `classes`.`id`")
            .whereRaw("`class_schedule`.`week_day` = ??", [Number(weekDay)])
            .whereRaw("`class_schedule`.`from` <= ??", [timeInMinutes])
            .whereRaw("`class_schedule`.`to` > ??", [timeInMinutes]);
        })
        .where("classes.subject", "=", subject)
        .join("users", "classes.user_id", "=", "users.id")
        .select(["classes.*", "users.*"]);

      return response.status(200).json({ classes });
    } catch (error) {
      return response.json({ message: "Houve um erro" });
    }
  }

  async create(request: Request, response: Response) {
    const { name, avatar, whatsapp, bio, subject, cost, schedule } =
      request.body;

    const trx = await database.transaction();

    try {
      const [insertedUserId] = await trx("users").insert({
        name,
        avatar,
        whatsapp,
        bio,
      });

      const [insertedClassId] = await trx("classes").insert({
        subject,
        cost,
        user_id: insertedUserId,
      });

      const classSchedule = schedule.map(
        ({ week_day, from, to }: IScheduleItem) => {
          return {
            class_id: insertedClassId,
            week_day,
            from: convertHourToMinutes(from),
            to: convertHourToMinutes(to),
          };
        }
      );

      await trx("class_schedule").insert(classSchedule);

      await trx.commit();

      return response.status(201).send();
    } catch (error) {
      await trx.rollback();

      return response.json({ status: 400, message: "Houve um erro" });
    }
  }
}

export default new ClassesController();
