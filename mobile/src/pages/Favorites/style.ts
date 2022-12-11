import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F7",
  },

  teacherList: {
    marginTop: -40,
  },

  searchForm: {
    marginBottom: 24,
  },

  label: {
    color: "#d4c2ff",
    fontFamily: "PoppinsRegular",
  },

  inputGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  inputBlock: {
    width: "48%",
  },

  input: {
    height: 54,
    backgroundColor: "#FFF",
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 8,
    marginBottom: 16,
  },

  submitFilterButton: {
    backgroundColor: "#04d361",
    flexDirection: "row",
    height: 56,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },

  submitFilterButtonText: {
    color: "#FFF",
    fontFamily: "ArchivoBold",
    fontSize: 16,
    marginLeft: 16,
  },
});

export default styles;
