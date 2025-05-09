// This is used for styled-components to forward props to the DOM element.
export const shouldForwardProp = <CustomProps extends Record<string, unknown>>(
  props: Array<keyof CustomProps>,
  prop: PropertyKey
): boolean => !props.includes(prop as string);
