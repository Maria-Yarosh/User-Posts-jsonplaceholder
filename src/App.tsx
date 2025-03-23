import { useEffect, useState } from "react";
import "./App.css";
import { getUserData, IUser } from "./getUserData";
import { api } from "./api/instance";
import { getUserPostData, IPosts } from "./getUserPostData";
import React from "react";
import { UserCard } from "./components/UserCard/UserCard";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { decrement, decrementByAmount, increment, incrementByAmount, selectCount } from "./redux/counter/counterSlice";

export default function App() {
  const [users, setUsers] = useState<IUser[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const [post, setPost] = useState<IPosts | null>(null)

  const count = useAppSelector(selectCount)
  const dispatch = useAppDispatch()

  useEffect(() => {
    console.log('useEffect');
    
    setLoader(true);
       api.get("/users")
      .then(function (response) {
        const data = getUserData(response.data);
        setUsers(data);
      })
      .then(() => {
        api.get("/posts")
        .then((res) => {
          const data = getUserPostData(res.data);
          setPost(data);
        })
      })
      .catch(function (error) {
        setError(error.message);
      })
      .finally(function () {
        setLoader(false);
      });
  }, []); 

  if (loader) {
    return <div className="loader"></div>;
  }
  console.log(post);

  const handleAddPost = (userId: number, postTitle: string, postDescription: string): void => {
    api.post('/posts', {
      title: postTitle,
      body: postDescription,
      userId: userId,
    }).then((res) => {
      setPost({
        ...post, 
        [userId]: post ? [...post[userId], res.data] : []
      })
    })
  }
  
  return (
    <>
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(incrementByAmount({value: 10}))}
        >
          Plus 10
        </button>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrementByAmount({values: [1, 2, 3], index: '2'}))}
        >
          test
        </button>
      </div>
    </div>
      {users?.map((user) => {
        const { id, name, fullAdress, phone, companyName } = user;
        return (
          <div key={id} className="card">
            <UserCard id={id} name={name} fullAdress={fullAdress} phone={phone} companyName={companyName} handleAddPost={handleAddPost}/>
            {
              post &&
              post[id].map((item) => {
                return (
                  <React.Fragment key={item.id}>
                  <div>{item.title}</div>
                  <div>{item.body}</div>
                  </React.Fragment>
                )
              })
            }
          </div>
        );
      })}
      <div>{error}</div>
    </>
  );
}
