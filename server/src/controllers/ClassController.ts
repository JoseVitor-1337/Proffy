import { Request, Response } from "express";

import database from "../database/connection";
import {
  transformClassSchedule,
  convertTimeInMinutes,
} from "../utils/transformClassSchedule";

class ClassController {
  async index(request: Request, response: Response) {
    const filters = request.query;

    let weekDay = filters.weekDay as string;
    let subject = filters.subject as string;
    let time = filters.time as string;

    if (!weekDay || !subject || !time) {
      return response.status(400).json({
        message: "Missing filters to search classes",
      });
    }

    const timeInMinutes = convertTimeInMinutes(time);

    const classes = await database("classes")
      .whereExists(function () {
        this.select("class_schedule.*")
          .from("class_schedule")
          .whereRaw("`class_schedule`.`class_id` = `classes`.`id`")
          .whereRaw("`class_schedule`.`week_day` = ??", [Number(weekDay)])
          .whereRaw("`class_schedule`.`from` <= ??", [Number(timeInMinutes)])
          .whereRaw("`class_schedule`.`to` > ??", [Number(timeInMinutes)]);
      })
      .where("classes.subject", "=", subject)
      .join("users", "classes.user_id", "=", "users.id")
      .select(["classes.*", "users.*"]);

    return response.json(classes);
  }

  async create(request: Request, response: Response) {
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule,
    } = request.body;

    const transactions = await database.transaction();

    try {
      const [insertedUserId] = await transactions("users").insert({
        name,
        avatar,
        whatsapp,
        bio,
      });

      let user_id = insertedUserId;

      const [insertedClassesId] = await transactions("classes").insert({
        subject,
        cost,
        user_id,
      });

      const class_id = insertedClassesId;

      let sequelizedSchedules = transformClassSchedule(schedule, class_id);

      await transactions("class_schedule").insert(sequelizedSchedules);

      await transactions.commit();

      return response.status(201).send();
    } catch (error) {
      await transactions.rollback();

      return response.status(400).json({
        message: "Unexpected error while creating new Class",
      });
    }
  }
}

export default new ClassController();
