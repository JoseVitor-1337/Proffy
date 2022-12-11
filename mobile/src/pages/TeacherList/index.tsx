import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  Text,
  ScrollView,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";

import styles from "./style";
import PageHeader from "../../components/PageHeader";
import TeacherItem, { ITeacher } from "../../components/TeacherItem";
import api from "../../services/api";

export default function TeacherList() {
  const [teachers, setTeachers] = useState<ITeacher[]>([]);
  const [favoritesTeachers, setFavoritesTeachers] = useState<number[]>([]);
  const [isFiltersVisible, setIsFiltersVisible] = useState(true);

  const [filters, setFilters] = useState({
    subject: "",
    week_day: "",
    time: "",
  });

  function handleToogleFiltersVisible() {
    setIsFiltersVisible(!isFiltersVisible);
    setTeachers([]);
  }

  function onChangeFilters(name: string, value: string): void {
    setFilters({ ...filters, [name]: value });
  }

  function loadFavoritesTeachers() {
    AsyncStorage.getItem("favorites").then((savedTeachers) => {
      if (savedTeachers) {
        const savedTeachersIds = JSON.parse(savedTeachers).map(
          (teacher: ITeacher) => teacher.id
        );

        setFavoritesTeachers(savedTeachersIds);
      }
    });
  }

  function handleSubmitFilters() {
    loadFavoritesTeachers();

    console.log("filters", filters);

    api
      .get("/classes", { params: filters })
      .then((response) => {
        setTeachers(response.data.classes);
        setIsFiltersVisible(false);
      })
      .catch(() => {
        alert("Erro ao filtrar");
      });
  }

  useFocusEffect(() => {
    loadFavoritesTeachers();
  });

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys disponíveis"
        headerRight={
          <TouchableOpacity onPress={handleToogleFiltersVisible}>
            <Feather name="filter" size={20} color="#FFF" />
          </TouchableOpacity>
        }
      >
        {isFiltersVisible ? (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              placeholderTextColor="#c1bccc"
              style={styles.input}
              placeholder="Qual a matéria"
              value={filters.subject}
              onChangeText={(text) => onChangeFilters("subject", text)}
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput
                  placeholderTextColor="#c1bccc"
                  style={styles.input}
                  placeholder="Qual o dia?"
                  value={filters.week_day}
                  onChangeText={(text) => onChangeFilters("week_day", text)}
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  placeholderTextColor="#c1bccc"
                  style={styles.input}
                  placeholder="Qual horário?"
                  value={filters.time}
                  onChangeText={(text) => onChangeFilters("time", text)}
                />
              </View>
            </View>

            <TouchableOpacity
              onPress={handleSubmitFilters}
              style={styles.submitFilterButton}
            >
              <Text style={styles.submitFilterButtonText}>Filtrar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View />
        )}
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
      >
        {teachers.map((teacher) => (
          <TeacherItem
            key={teacher.id}
            teacher={teacher}
            favorited={favoritesTeachers.includes(teacher.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
