import { Text, TouchableOpacity } from 'react-native'
import Loading from './Loading'

const CustomTextButtom = ({ title, color, handlePress, constainerStyles, textStyles, isLoading, disabled }) => {

    const getColor = () => {
        if (disabled) return 'bg-light';
        return color ? color : 'bg-medium';
    }

    return (
        <TouchableOpacity
            accessibilityState={{ busy: isLoading }}
            onPress={handlePress}
            activeOpacity={0.7}
            className={`${getColor()} rounded-3xl min-h-[48px] px-5
                justify-center items-center ${constainerStyles} ${isLoading ? 'opacity-50' : ''}`}
            disabled={isLoading || disabled}>
            <Loading loading={isLoading} color='black'>
                <Text className={`${disabled ? 'text-gray-500' : 'text-primary'} font-semibold text-lg ${textStyles}`}>{title}</Text>
            </Loading>
        </TouchableOpacity>
    )
}

const CustomIconButtom = ({ children, color, handlePress, constainerStyles, isLoading, disabled }) => {

    const getColor = () => {
        if (disabled) return 'bg-light';
        return color ? color : 'bg-medium';
    }

    return (
        <TouchableOpacity
            accessibilityState={{ busy: isLoading }}
            onPress={handlePress}
            activeOpacity={0.7}
            className={`${getColor()} rounded-3xl min-h-[48px] px-5
                justify-center items-center ${constainerStyles} ${isLoading ? 'opacity-50' : ''}`}
            disabled={isLoading || disabled}>
            <Loading loading={isLoading} color='black'>
                {children}
            </Loading>
        </TouchableOpacity>
    )
}

const CustomButton = ({ title, color, children, handlePress, constainerStyles, textStyles, isLoading, disabled }) => {
    if (children)
        return (
            <CustomIconButtom
                handlePress={handlePress}
                constainerStyles={constainerStyles}
                isLoading={isLoading}
                color={color}
                disabled={disabled}>
                {children}
            </CustomIconButtom>
        );
    else return <CustomTextButtom
        title={title}
        textStyles={textStyles}
        handlePress={handlePress}
        color={color}
        constainerStyles={constainerStyles}
        isLoading={isLoading}
        disabled={disabled} />

}

export default CustomButton