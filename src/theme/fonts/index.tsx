import {isIOS} from '../../utils/PlatformUtil';

const FONTS = {
  primaryRegular: isIOS() ? 'Inter Variable' : 'Inter-Variable',
  primaryItalic: isIOS() ? 'Inter Variable Italic' : 'Inter-Variable-Italic',
  headingBold: isIOS() ? 'Ulagadi Sans Bold' : 'UlagadiSansBold',
  headingSemibold: isIOS() ? 'Ulagadi Sans SemiBold' : 'UlagadiSansSemiBold',
  headingRegular: isIOS() ? 'Ulagadi Sans' : 'UlagadiSansRegular',
};

export default FONTS;
