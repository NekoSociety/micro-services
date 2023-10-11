import type { ThemeConfig } from 'antd'

import { colors, fonts } from '../tokens'

/**
 * Theme light
 */
const lightTheme: ThemeConfig = {
  token: {
    // Bg
    colorBgContainer: colors.white,
    colorBgElevated: colors.white,
    colorBgLayout: colors.grey[1],
    colorBgMask: colors.opacity['0.5'],
    colorBgSpotlight: colors.black,

    // Border
    colorBorder: colors.grey[4],
    colorBorderSecondary: colors.grey[3],

    // Error
    colorError: colors.red[5],
    colorErrorActive: colors.red[8],
    colorErrorBg: colors.red[1],
    colorErrorBgHover: colors.red[2],
    colorErrorBorder: colors.red[3],
    colorErrorBorderHover: colors.red[6],
    colorErrorHover: colors.red[6],
    colorErrorText: colors.red[6],
    colorErrorTextActive: colors.red[10],
    colorErrorTextHover: colors.red[10],

    // Fill
    colorFill: colors.grey[3],
    colorFillQuaternary: colors.white,
    colorFillSecondary: colors.grey[2],
    colorFillTertiary: colors.grey[1],

    // Info
    colorInfo: colors.blue[5],
    colorInfoActive: colors.blue[7],
    colorInfoBg: colors.blue[1],
    colorInfoBgHover: colors.blue[2],
    colorInfoBorder: colors.blue[3],
    colorInfoBorderHover: colors.blue[4],
    colorInfoHover: colors.blue[6],
    colorInfoText: colors.blue[8],
    colorInfoTextActive: colors.blue[9],
    colorInfoTextHover: colors.blue[6],

    // Primary
    colorPrimary: colors.tgreen[5],
    colorPrimaryActive: colors.tgreen[6],
    colorPrimaryBg: colors.tgreen[1],
    colorPrimaryBgHover: colors.tgreen[2],
    colorPrimaryBorder: colors.tgreen[3],
    colorPrimaryBorderHover: colors.tgreen[3],
    colorPrimaryHover: colors.tgreen[7],
    colorPrimaryText: colors.tgreen[10],
    colorPrimaryTextActive: colors.tgreen[5],
    colorPrimaryTextHover: colors.tgreen[6],

    // Success
    colorSuccess: colors.tgreen[4],
    colorSuccessActive: colors.tgreen[5],
    colorSuccessBg: colors.tgreen[1],
    colorSuccessBgHover: colors.tgreen[2],
    colorSuccessBorder: colors.tgreen[4],
    colorSuccessBorderHover: colors.tgreen[7],
    colorSuccessHover: colors.tgreen[5],
    colorSuccessText: colors.tgreen[5],
    colorSuccessTextActive: colors.tgreen[5],
    colorSuccessTextHover: colors.tgreen[6],

    // Text
    colorText: colors.grey[10],
    colorTextBase: colors.grey[10],
    colorTextQuaternary: colors.grey[2],
    colorTextSecondary: colors.grey[8],
    colorTextTertiary: colors.grey[5],

    // Warning
    colorWarning: colors.orange[5],
    colorWarningActive: colors.orange[8],
    colorWarningBg: colors.orange[1],
    colorWarningBgHover: colors.orange[2],
    colorWarningBorder: colors.orange[3],
    colorWarningBorderHover: colors.orange[6],
    colorWarningHover: colors.orange[6],
    colorWarningText: colors.orange[8],
    colorWarningTextActive: colors.orange[10],
    colorWarningTextHover: colors.orange[9],

    // Font
    fontSize: fonts.size.base,
    fontFamily: fonts.family.base,
  },
}

export default lightTheme
