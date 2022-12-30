import { Knight } from "./Knight.jsx";
export const Piece = ({ isKnight }) => (isKnight ? <Knight /> : null);
