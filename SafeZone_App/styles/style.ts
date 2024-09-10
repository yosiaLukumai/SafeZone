import { Platform, StyleSheet } from "react-native";

export const customStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: "#111827"
      },
      MainCont: {
        paddingTop: Platform.OS === "ios" ? 0 : 10,
        flex: 1
      },
      FormOne: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: 12,
        marginTop: 10,
        borderRadius: 12,
        paddingVertical: 60,
      },
      LabelInputs: {
        fontSize: 15,
        fontWeight: "500",
        color: "white"
      },
      LittlePad: {
        paddingHorizontal: 12,
        gap: 22
      },
      littleGap: {
        rowGap: 22,
      },
      input: {
        height: 50,
        borderWidth: 1,
        padding: 10,
        fontSize: 19,
        borderRadius: 12,
        marginVertical: 5,
        fontWeight: '500',
        borderColor: "white",
        color: "#758694",
      },
      firstInput: {
        flexDirection: "row",
        justifyContent: "space-between",
        columnGap: 12,
        alignContent: "center",
        alignItems: "center"
      },
      gapped: {
        flexGrow: 1
      },
      barCode: {
        borderWidth: 0.3,
        height: 50,
        justifyContent: "center",
        borderColor: "whitesmoke",
        paddingHorizontal: 4,
        borderRadius: 7,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
      },
      submitButton: {
        backgroundColor: "#f9c647",
        height: 45,
        justifyContent: 'center',
        borderRadius: 15,
      },
      submitText: {
        textAlign: "center",
        fontWeight: "500",
        color: "black",
        fontSize: 22
      },
}) 