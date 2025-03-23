import { ChangeEvent, FC, useState } from "react";
import { IUser } from "../../getUserData";

interface IUserCardData  extends IUser {
    handleAddPost: (userId: number, postTitle: string, postDescription: string) => void
}

export const UserCard: FC<IUserCardData> = (props) => {
    const { id, name, fullAdress, phone, companyName, handleAddPost } = props
    const [inputValue, setInputValue] = useState<string>('')
    const [inputDescriptionValue, setInputDescriptionValue] = useState<string>('')

    const handlePostTitleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setInputValue(e.target.value)
      }
    
      const handlePostDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        setInputDescriptionValue(e.target.value)
      }

    return (
        <>
            <div>Имя пользователя: {name}</div>
            <div>Телефон: {phone}</div>
            <div>Адрес: {fullAdress}</div>
            <div>Компания: {companyName}</div>
            <input placeholder="Add title" onChange={handlePostTitleChange} value={inputValue}/>
            <textarea placeholder="Add description" value={inputDescriptionValue} onChange={handlePostDescriptionChange}/>
            <button onClick={() => handleAddPost(id, inputValue, inputDescriptionValue)}>Add Post</button>
        </>
    )
}