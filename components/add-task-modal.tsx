import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';

interface TaskModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (title: string, subtitle: string) => void;
  initialTitle?: string;
  initialSubtitle?: string;
  mode: 'add' | 'edit';
}

export const TaskModal: React.FC<TaskModalProps> = ({
  visible,
  onClose,
  onSubmit,
  initialTitle = '',
  initialSubtitle = '',
  mode,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [subtitle, setSubtitle] = useState(initialSubtitle);

  useEffect(() => {
    setTitle(initialTitle);
    setSubtitle(initialSubtitle);
  }, [initialTitle, initialSubtitle, visible]);

  const handleSubmit = () => {
    if (title.trim()) {
      onSubmit(title, subtitle);
      setTitle('');
      setSubtitle('');
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{mode === 'add' ? 'Ajouter une tâche' : 'Modifier la tâche'}</Text>
          <TextInput
            style={styles.input}
            placeholder="Titre de la tâche"
            value={title}
            onChangeText={setTitle}
            autoFocus
          />
          <TextInput
            style={styles.input}
            placeholder="Sous-titre (optionnel)"
            value={subtitle}
            onChangeText={setSubtitle}
          />
          <View style={styles.buttons}>
            <Button title="Annuler" onPress={onClose} color="#888" />
            <Button title={mode === 'add' ? 'Ajouter' : 'Enregistrer'} onPress={handleSubmit} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
