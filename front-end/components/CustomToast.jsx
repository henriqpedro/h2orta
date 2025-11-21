import { View, Text, AccessibilityInfo } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { styled } from 'nativewind';
import { useEffect } from 'react';

const StyledView = styled(View);
const StyledText = styled(Text);

export default function CustomToast({ text1, text2, type }) {
  const config = {
    error: { bg: 'bg-danger', icon: 'error-outline' },
    success: { bg: 'bg-medium', icon: 'check-circle-outline' },
    info: { bg: 'bg-gray', icon: 'info-outline' },
  };

  const { bg, icon } = config[type] || config.info;

  useEffect(() => {
    if ((text1 && text1 != '') || (text2 && text2 != '')) {
      const message = [text1, text2].filter(Boolean).join('. ');
      AccessibilityInfo.announceForAccessibility(message);
    }
  }, [text1, text2, type]);


  return (
    <StyledView className={`flex-row bg- p-4 mx-4 rounded-lg items-center shadow-lg ${bg}`}>
      <MaterialIcons name={icon} size={24} color="white" className="mr-2" />
      <StyledView className="flex-1">
        <StyledText className="ml-2 text-white font-bold text-base">{text1}</StyledText>
        {text2 && <StyledText className="ml-2 text-white text-sm">{text2}</StyledText>}
      </StyledView>
    </StyledView>
  );
}
