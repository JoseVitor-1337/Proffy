import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "./style";
import PageHeader from "../../components/PageHeader";
import TeacherItem, { ITeacher } from "../../components/TeacherItem";

export default function Favorites() {
  const [favoritesTeachers, setFavoritesTeachers] = useState<ITeacher[]>([]);

  useFocusEffect(() => {
    AsyncStorage.getItem("favorites").then((response) => {
      if (response) {
        const favoriteTeachers: ITeacher[] = JSON.parse(response);

        setFavoritesTeachers(favoriteTeachers);
      }
    });
  });

  return (
    <View style={styles.container}>
      <PageHeader title="Meus proffys disponíveis"></PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
      >
        {favoritesTeachers.map((teacher) => (
          <TeacherItem key={teacher.id} teacher={teacher} favorited />
        ))}
      </ScrollView>
    </View>
  );
}
