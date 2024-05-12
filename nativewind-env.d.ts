/// <reference types="nativewind/types" />

declare module '*.jpg' {
    import { ImageSourcePropType } from 'react-native';
    const value: ImageSourcePropType;
    export default value;
}

declare module '*.png' {
    import { ImageSourcePropType } from 'react-native';
    const value: ImageSourcePropType;
    export default value;
}
/* type FormEvent = React.FormEvent<HTMLFormElement>
type MouseEvent = React.MouseEvent<HTMLButtonElement>
type ChangeEvent = React.ChangeEvent<HTMLInputElement>

export { FormEvent, MouseEvent, ChangeEvent }; */