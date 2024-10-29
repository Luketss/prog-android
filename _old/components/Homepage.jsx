import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Image,
} from "react-native";

const faces = [
  { id: 1, label: "😞", mood: "Bad day" },
  { id: 2, label: "😕", mood: "Not great" },
  { id: 3, label: "😐", mood: "Okay" },
  { id: 4, label: "😊", mood: "Good day" },
  { id: 5, label: "😄", mood: "Perfect day" },
];

const Homepage = () => {
  const [selectedFace, setSelectedFace] = useState(null);
  const [description, setDescription] = useState("");

  const handleSend = () => {
    if (selectedFace && description) {
      console.log(`Mood: ${selectedFace.mood}, Description: ${description}`);
      // Clear fields after sending
      setSelectedFace(null);
      setDescription("");
    } else {
      alert("Please select a mood and describe your day!");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container}>
        <View>
          <Text style={styles.title}>How was your day?</Text>

          <View style={styles.faceContainer}>
            {faces.map((face) => (
              <TouchableOpacity
                key={face.id}
                style={[
                  styles.faceButton,
                  selectedFace?.id === face.id && styles.selectedFace,
                ]}
                onPress={() => setSelectedFace(face)}
              >
                <Text style={styles.faceText}>{face.label}</Text>
                <Text style={styles.moodText}>{face.mood}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            style={styles.input}
            placeholder="Describe your day..."
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  faceContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  faceButton: {
    alignItems: "center",
  },
  selectedFace: {
    backgroundColor: "#ddeeff",
    borderRadius: 50,
    padding: 10,
  },
  faceText: {
    fontSize: 40,
  },
  moodText: {
    marginTop: 5,
    fontSize: 14,
    textAlign: "center",
  },
  input: {
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
    textAlignVertical: "top",
    marginBottom: 20,
  },
  sendButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Homepage;
