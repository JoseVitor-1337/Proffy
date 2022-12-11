import React from "react";
import { useNavigation } from "@react-navigation/native";

import { Text, ImageBackground, View, TouchableOpacity } from "react-native";

import styles from "./style";

import giveClassesBgImage from "../../assets/images/give-classes-background.png";

export default function GiveClasses() {
  const { goBack } = useNavigation();

  function handleNavigateBack() {
    goBack();
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="contain"
        style={styles.content}
        source={giveClassesBgImage}
      >
        <Text style={styles.title}>Quer ser um Proffy?</Text>

        <Text style={styles.description}>
          Para começar, você precisa se cadastrar como professor na nossa
          plataforma web
        </Text>
      </ImageBackground>

      <TouchableOpacity onPress={handleNavigateBack} style={styles.okButton}>
        <Text style={styles.okButtonText}>Tudo bem</Text>
      </TouchableOpacity>
    </View>
  );
}
