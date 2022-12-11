import React, { memo, ReactElement } from "react";
import { useNavigation } from "@react-navigation/native";
import { Image, Text, View, TouchableOpacity } from "react-native";

import backIcon from "../../assets/images/icons/back.png";
import logoImage from "../../assets/images/logo.png";

import styles from "./style";

interface PageHeaderProps {
  title: string;
  headerRight?: ReactElement;
  children?: ReactElement;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  headerRight,
  children,
}) => {
  const { navigate } = useNavigation();

  function handleGoBack() {
    navigate("Landing" as never);
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handleGoBack}>
          <Image source={backIcon} resizeMode="contain" />
        </TouchableOpacity>

        <Image source={logoImage} resizeMode="contain" />
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {headerRight}
      </View>

      {children}
    </View>
  );
};

export default memo(PageHeader);
