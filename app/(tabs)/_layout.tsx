import { Tabs } from 'expo-router';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { HapticTab } from '@/components/haptic-tab';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
        }}>
        <Tabs.Screen
          name="Tâches"
          options={{
            title: 'Tâches',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="checkmark.circle" color={color} />,
          }}
        />
        <Tabs.Screen
          name="Ajout de tâche"
          options={{
            title: 'Ajout de tâche',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="plus.circle" color={color} />,
          }}
        />
        <Tabs.Screen
          name="task/[id]"
          options={{
            href: null,         
            headerShown: false,  
          }}
        />
      </Tabs>
  );
}
