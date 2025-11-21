import { Text, TouchableOpacity } from 'react-native'
import Loading from './Loading'
import { forwardRef } from 'react';

const CustomTextButtom = forwardRef(({
    title,
    color,
    handlePress,
    constainerStyles,
    textStyles,
    isLoading,
    disabled
}, ref) => {

    const getColor = () => {
        if (disabled) return 'bg-light';
        return color ? color : 'bg-medium';
    }

    return (
        <TouchableOpacity
            ref={ref}
            accessibilityState={{ busy: isLoading }}
            onPress={handlePress}
            activeOpacity={0.7}
            className={`${getColor()} rounded-3xl min-h-[48px] px-5
                justify-center items-center ${constainerStyles} ${isLoading ? 'opacity-50' : ''}`}
            disabled={isLoading || disabled}>
            <Loading loading={isLoading}>
                <Text className={`${disabled ? 'text-gray-500' : 'text-primary'} font-semibold text-lg ${textStyles}`}>{title}</Text>
            </Loading>
        </TouchableOpacity>
    )
})

const CustomIconButtom = forwardRef(({
    children,
    color,
    handlePress,
    constainerStyles,
    isLoading,
    disabled
}, ref) => {

    const getColor = () => {
        if (disabled) return 'bg-light';
        return color ? color : 'bg-medium';
    }

    return (
        <TouchableOpacity
            ref={ref}
            accessibilityState={{ busy: isLoading }}
            onPress={handlePress}
            activeOpacity={0.7}
            className={`${getColor()} rounded-3xl min-h-[48px] px-5
                justify-center items-center ${constainerStyles} ${isLoading ? 'opacity-50' : ''}`}
            disabled={isLoading || disabled}>
            <Loading loading={isLoading}>
                {children}
            </Loading>
        </TouchableOpacity>
    )
})

const CustomButton = forwardRef(({
    title,
    color,
    children,
    handlePress,
    constainerStyles,
    textStyles,
    isLoading,
    disabled
}, ref) => {
    if (children)
        return (
            <CustomIconButtom
                ref={ref}
                handlePress={handlePress}
                constainerStyles={constainerStyles}
                isLoading={isLoading}
                color={color}
                disabled={disabled}>
                {children}
            </CustomIconButtom>
        );
    else return <CustomTextButtom
        ref={ref}
        title={title}
        textStyles={textStyles}
        handlePress={handlePress}
        color={color}
        constainerStyles={constainerStyles}
        isLoading={isLoading}
        disabled={disabled} />

})

export default CustomButton