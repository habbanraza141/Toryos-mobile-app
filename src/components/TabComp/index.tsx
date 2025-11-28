import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { ColorPalette, colors, getColors } from '../../theme/colors';
import { shadows } from '../../theme/shadows';

interface TabBarProps {
  tabs: string[];
  value: number;
  onChange: (index: number) => void;
}

const TabBar: React.FC<TabBarProps> = ({ tabs, value, onChange }) => {
  const theme = useTheme();
  const colors = getColors(theme);
  const isDark = theme === 'dark';
  const styles = createStyleSheet(colors, isDark);

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              value === index && styles.activeTab,
              index === 0 && styles.firstTab,
              index === tabs.length - 1 && styles.lastTab,
            ]}
            onPress={() => onChange(index)}>
            <Text numberOfLines={1}
              style={[
                styles.tabText,
                value === index && styles.activeTabText,
              ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};


const createStyleSheet = (colors: ColorPalette, isDark: boolean) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    tabBar: {
      flexDirection: 'row',
      height: 40,
      width: '100%',
      backgroundColor: colors.secondaryBackground,
      borderRadius: 10,
      position: 'relative',
      borderWidth: 1,
      borderColor: colors.muted15,
      ...(isDark ? {} : shadows.button),
    },
    tab: {
      flex: 1,
      paddingHorizontal: '3%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    firstTab: {
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
    },
    lastTab: {
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      borderRightWidth: 0,
    },
    activeTab: {
      backgroundColor: colors.primary,
      borderRadius: 10,
    },
    tabText: {
      color: colors.default,
      fontWeight: '500',
    },
    activeTabText: {
      color: colors.white,
      fontWeight: '600',
    },
    content: {
      padding: 20,
    },
    contentText: {
      fontSize: 18,
      textAlign: 'center',
      color: colors.default,
    },
  });
};

export default TabBar;
