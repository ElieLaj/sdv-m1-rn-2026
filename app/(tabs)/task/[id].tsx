import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useTodoContext } from '@/components/todo-context';

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string | string[] }>();
  const { todos } = useTodoContext();

  const taskId = Array.isArray(id) ? id[0] : id;
  const task = todos.find((t) => t.id === taskId);
  
  if (!task) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>Tâche introuvable</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.description}>{task.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#ffffff',
  },
  description: {
    fontSize: 18,
    color: '#ffffff',
  },
  notFound: {
    fontSize: 20,
    color: 'red',
  },
});
