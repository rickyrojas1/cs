import React from "react";
import {
  CardTitle,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Avatar
} from "material-ui";

const NewsCard = props => {
  const styles = {
    card: {
      maxWidth: 345
    },
    media: {
      height: 0,
      paddingTop: "56.25%" // p16:9
    }
  };

  let article = props.article;
  let date = new Date(article.published_on * 1000);
  var el = document.createElement("p");
  el.innerHTML = article.body;
  let bio = el.innerText;
  console.log("bio.length :", bio.length);
  let shortBio = bio.substring(0, 350) + "...";
  console.log("shortBio :", shortBio);

  return (
    <div className="news-card">
      <Card style={styles.card} className="crd">
        <CardMedia
          style={styles.media}
          image={article.imageurl}
          title={article.tags}
        />

        <CardContent>
          <Typography
            gutterBottom
            variant="headline"
            component="h1"
            className="article-title"
            style={{ fontSize: 20, fontWeight: "bold" }}
          >
            {article.title}
          </Typography>
          <Typography component="h5" style={{ fontSize: 12, marginBottom: 20 }}>
            {date.toDateString()}
          </Typography>

          <Typography component="h5" style={{ fontSize: 12 }}>
            {shortBio}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="large" color="primary">
            <a target="_blank" href={article.url} className="read-article">
              Read Article
            </a>
          </Button>
          <Avatar src={article.source_info.img} style={{ marginLeft: 50 }} />
          <Typography component="h5" style={{ fontSize: 12 }}>
            {article.source_info.name}
          </Typography>
        </CardActions>
      </Card>
    </div>
  );
};

export default NewsCard;
