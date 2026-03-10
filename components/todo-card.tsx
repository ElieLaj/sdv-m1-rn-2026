import React from 'react';
import { View, Text, StyleSheet, Button, Pressable } from 'react-native';

interface TodoCardProps {
  title: string;
  description: string;
  onPress?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const TodoCard: React.FC<TodoCardProps> = ({
  title,
  description,
  onPress,
  onEdit,
  onDelete,
}) => {
  return (
    <Pressable style={[styles.card, { cursor: onPress ? 'pointer' : 'auto' }]} onPress={onPress}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      <View style={styles.actions}>
        {onEdit && <Button title="Edit" onPress={onEdit} />}
        {onDelete && <Button title="Delete" onPress={onDelete} color="#ff5c5c" />}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#bfc9db',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
  },
  description: {
    fontSize: 15,
    color: '#222',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  actions: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginTop: 8,
    gap: 8,
  },
});

export default TodoCard;
