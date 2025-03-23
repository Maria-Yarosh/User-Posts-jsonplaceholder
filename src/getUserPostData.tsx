interface IPost {
    userId: number,
      id: number,
      title: string,
      body: string
  }

export interface IPosts {
    [userId: number ]: IPost[]
  }

export const getUserPostData = (data: IPost[]) => {
    return data.reduce<IPosts>((acc, post) => {
        if (!acc[post.userId]) {
          acc[post.userId] = [];
        }
        acc[post.userId].push(post);
        return acc;
      }, {});
}