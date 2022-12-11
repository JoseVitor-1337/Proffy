import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { memo, useState } from "react";
import { Linking, Image, Text, View, TouchableOpacity } from "react-native";

import heartOutlineIcon from "../../assets/images/icons/heart-outline.png";
import unfavoriteIcon from "../../assets/images/icons/unfavorite.png";
import whatsappIcon from "../../assets/images/icons/whatsapp.png";
import api from "../../services/api";

import styles from "./style";

export interface ITeacher {
  id: number;
  avatar: string;
  name: string;
  subject: string;
  bio: string;
  cost: number;
  whatsapp: string;
}

interface TeacherItemProps {
  teacher: ITeacher;
  favorited: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ favorited, teacher }) => {
  const [isFavorited, setIsFavorited] = useState(favorited);

  function handleLinkToWhatsapp() {
    try {
      api.post("connections", {
        user_id: teacher.id,
      });
    } catch (error) {
      alert("Não foi possível salvar conexão");
    }

    Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
  }

  async function handleToogleFavorite() {
    const favorites = await AsyncStorage.getItem("favorites");

    let favoritesArray: ITeacher[] = [];

    if (favorites) favoritesArray = JSON.parse(favorites);

    if (isFavorited) {
      favoritesArray = favoritesArray.filter(({ id }) => {
        return teacher.id !== id;
      });

      await AsyncStorage.setItem("favorites", JSON.stringify(favoritesArray));

      setIsFavorited(false);
    } else {
      favoritesArray.push(teacher);

      await AsyncStorage.setItem("favorites", JSON.stringify(favoritesArray));

      setIsFavorited(true);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image style={styles.avatar} source={{ uri: teacher.avatar }} />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>

      <Text style={styles.bio}>{teacher.bio}</Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora <Text style={styles.priceValue}>R$ {teacher.cost}</Text>
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={handleToogleFavorite}
          style={[styles.favoriteButton, isFavorited ? styles.favorited : {}]}
        >
          {isFavorited ? (
            <Image source={unfavoriteIcon} />
          ) : (
            <Image source={heartOutlineIcon} />
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactButton}>
          <Image source={whatsappIcon} />
          <Text onPress={handleLinkToWhatsapp} style={styles.contactButtonText}>
            Entrar em contato
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(TeacherItem);
