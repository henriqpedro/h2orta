import { Text, TouchableOpacity } from 'react-native'
import Loading from './Loading'

const CustomTextButtom = ({ title, handlePress, constainerStyles, textStyles, isLoading, disabled }) => {
    return (
        <TouchableOpacity
            accessibilityState={{ busy: isLoading }}
            onPress={handlePress}
            activeOpacity={0.7}
            className={`${disabled ? 'bg-light' : 'bg-medium'} rounded-3xl min-h-[48px] px-5
                justify-center items-center ${constainerStyles} ${isLoading ? 'opacity-50' : ''}`}
            disabled={isLoading || disabled}>
            <Loading loading={isLoading} color='black'>
                <Text className={`${disabled ? 'text-gray-500' : 'text-primary'} font-semibold text-lg ${textStyles}`}>{title}</Text>
            </Loading>
        </TouchableOpacity>
    )
}

const CustomIconButtom = ({ children, handlePress, constainerStyles, isLoading, disabled }) => {
    return (
        <TouchableOpacity
            accessibilityState={{ busy: isLoading }}
            onPress={handlePress}
            activeOpacity={0.7}
            className={`${disabled ? 'bg-light' : 'bg-medium'} rounded-3xl min-h-[48px] px-5
                justify-center items-center ${constainerStyles} ${isLoading ? 'opacity-50' : ''}`}
            disabled={isLoading || disabled}>
            <Loading loading={isLoading} color='black'>
                {children}
            </Loading>
        </TouchableOpacity>
    )
}

const CustomButton = ({ title, children, handlePress, constainerStyles, textStyles, isLoading, disabled }) => {
    if (children)
        return (
            <CustomIconButtom
                handlePress={handlePress}
                constainerStyles={constainerStyles}
                isLoading={isLoading}
                disabled={disabled}>
                {children}
            </CustomIconButtom>
        );
    else return <CustomTextButtom
        title={title}
        textStyles={textStyles}
        handlePress={handlePress}
        constainerStyles={constainerStyles}
        isLoading={isLoading}
        disabled={disabled} />

}

export default CustomButton