import React, {useEffect} from "react";

import { Post } from "../components";
import { Index } from "../components";
import { CommentsBlock } from "../components";
import {useParams} from "react-router-dom";
import axios from "../axios";

export const FullPost = () => {
  const params = useParams()
  const [data, setData] = React.useState({})
  const [isLoading, setIsLoading] = React.useState(true)
  const { id } = params
  useEffect(() => {
    axios.get("api/posts/" + id).then(({data}) => {
      setData(data)
      setIsLoading(false)
    }).catch((e) => {
      console.log(e)
      alert('Ошибка при получении статьи')
    })
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost/>
  }
  return (
    <>
      <Post
        id={id}
        title={data.title}
        imageUrl={data.imageUrl}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.views}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <p>
          {data.text}
        </p>
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
