import { Button } from "semantic-ui-react";

export const LikeButton = ({ onLike, likes }) => (
    <Button
        className="mini"
        color="red"
        content="Like"
        icon="heart"
        label={{
            basic: true,
            color: "red",
            pointing: "left",
            content: likes,
        }}
        onClick={onLike}
    />
);

export const LinkButton = ({ url }) => (
    <Button
        className="mini"
        color="linkedin"
        content={
            <a style={{ color: "white" }} href={url}>
                URL
            </a>
        }
        icon="chain"
    />
);

export const DeleteButton = ({ onDelete }) => (
    <Button
        className="mini"
        color="grey"
        content="Delete"
        icon="delete"
        onClick={onDelete}
    />
);
