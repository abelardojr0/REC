export default function responsivo(breakpoints) {
  return `@media (max-width: ${breakpoints})`;
}
export const breakpoints = {
  mobile: "480px",
  tablet: "768px",
  desktop: "1000px",
};
