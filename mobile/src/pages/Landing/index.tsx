import React, { useState, useEffect } from "react";
import { Text, Image, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "./style";

import LandingImage from "../../assets/images/landing.png";
import studyIcon from "../../assets/images/icons/study.png";
import giveClassesIcon from "../../assets/images/icons/give-classes.png";
import hearticon from "../../assets/images/icons/heart.png";
import api from "../../services/api";

export default function LandingPage() {
  const [totalConnections, setTotalConnections] = useState(0);

  const { navigate } = useNavigation();

  function handleNavigateToGiveClasses() {
    navigate("GiveClasses" as never);
  }

  function handleNavigateToStudyPages() {
    navigate("Study" as never);
  }

  useEffect(() => {
    async function loadAsyncFunction() {
      const response = await api.get("/connections");

      setTotalConnections(response?.data?.total || 0);
    }

    loadAsyncFunction();
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.banner} source={LandingImage} />

      <Text style={styles.title}>
        Seja bem-vindo, {`\n`}
        <Text style={styles.titleBold}>O que deseja fazer?</Text>
      </Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.button, styles.buttonPrimary]}
          onPress={handleNavigateToStudyPages}
        >
          <Image source={studyIcon} />
          <Text style={styles.buttonText}>Estudar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.button, styles.buttonSecondary]}
          onPress={handleNavigateToGiveClasses}
        >
          <Image source={giveClassesIcon} />
          <Text style={styles.buttonText}>Dar aulas</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.totalConnectionsText}>
        Total de {totalConnections} connexões já realizadas{" "}
        <Image source={hearticon} />
      </Text>
    </View>
  );
}
