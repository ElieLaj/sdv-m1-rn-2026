import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Button } from 'react-native';
import TodoCard from './todo-card';
import { TaskModal } from './add-task-modal';
import { useTodoContext } from './todo-context';
import { router } from 'expo-router'; // ✅ au lieu de navigate interne

export interface TodoItem {
  id: string;
  title: string;
  description: string;
}

const TodoList: React.FC = () => {
  const { todos, addTodo, editTodo, deleteTodo } = useTodoContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editSubtitle, setEditSubtitle] = useState('');

  const openEditModal = (id: string) => {
    const todo = todos.find((t) => t.id === id);
    setEditingId(id);
    setEditTitle(todo ? todo.title : '');
    setEditSubtitle(todo ? todo.description : '');
    setModalVisible(true);
  };

  const openAddModal = () => {
    setAddModalVisible(true);
  };
  const handleAddTask = (title: string, subtitle: string) => {
    addTodo(title, subtitle);
  };

  const handleEditSave = (title: string, subtitle: string) => {
    if (editingId) {
      editTodo(editingId, title, subtitle);
    }
    setModalVisible(false);
    setEditingId(null);
    setEditTitle('');
    setEditSubtitle('');
  };


  return (
    <View style={styles.container}>
      <Button title="Ajouter une tâche" onPress={openAddModal} />
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoCard
            title={item.title}
            description={item.description}
            onDelete={() => deleteTodo(item.id)}
            onEdit={() => openEditModal(item.id)}
            onPress={() =>
              router.push({
                pathname: '/task/[id]',
                params: { id: item.id },
              })
            }
          />
        )}
        contentContainerStyle={styles.listContent}
      />
      {/* Modale d'ajout */}
      <TaskModal
        visible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        onSubmit={handleAddTask}
        mode="add"
      />
      {/* Modale d'édition */}
      <TaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleEditSave}
        initialTitle={editTitle}
        initialSubtitle={editSubtitle}
        mode="edit"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingVertical: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 24,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#bfc9db',
    borderRadius: 6,
    padding: 8,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
});

export default TodoList;
