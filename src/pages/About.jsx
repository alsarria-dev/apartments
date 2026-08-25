import Page from "../components/Page";
import profPic from "../assets/images/pixel_profile_pic.png";
import styles from "./About.module.css";

function About() {
  return (
    <Page>
      <div className={styles.about}>
        <div className={styles.portrait}>
          <img
            className={styles.image}
            src={profPic}
            alt=""
            width={280}
            height={280}
            decoding="async"
          />
          <p className={styles.handle}>alsarria-dev</p>
        </div>

        <div className={styles.body}>
          <h1 className={styles.title}>About HomeBrew</h1>
          <p className={styles.paragraph}>
            HomeBrew is a small catalogue of places to stay in Madrid, Berlin
            and Paris — a hundred apartments, lofts and rooms, each with a
            price, a host and a photograph.
          </p>
          <p className={styles.paragraph}>
            It began as a practice project and is kept as one: a place to work
            on the parts of an interface that usually get left until last —
            empty states, keyboard focus, what a page does before its images
            arrive.
          </p>
        </div>
      </div>
    </Page>
  );
}

export default About;
