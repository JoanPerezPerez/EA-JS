async function getUser(userId) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
  if (!response.ok) throw new Error("Error al obtener el usuario");
  return response.json();
}

async function getPosts(userId) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  if (!response.ok) throw new Error("Error al obtener los posts");
  return response.json();
}

async function getComments(postId) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
  if (!response.ok) throw new Error("Error al obtener comentarios del post");
  return response.json();
}

async function fetchUserData(userId) {
  try {
    const user = await getUser(userId);
    console.log("User:", user);
    const posts = await getPosts(userId);
    console.log("Posts:", posts);
    const commentsPromises = posts.map(post => getComments(post.id));
    //console.log("comments", commentsPromises);
    const comments = await Promise.all(commentsPromises);
    console.log("Comments:", comments);

    const allComments = comments.flat();
    const comentsbyEmail = allComments
      .filter(comments => comments.email.includes('.biz'))
      .map(comments => comments.id*2)
      .reduce((a, b) => a + b, 0);
    console.log(comentsbyEmail);

  
    const commentByName = allComments
      .filter(comment => comment.id >= 10)
      .sort((a, b) => a.email.localeCompare(b.email))
      .map(comment => `Comment name: @${comment.name} ` + `Email: ${comment.email}`+ `Body: ${comment.body}`);
    console.log(commentByName)

  } catch (error) {
    console.error("Error:", error);
  }
}

fetchUserData(1);

