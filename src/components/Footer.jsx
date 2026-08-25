// Importing Logos
import instagramLogo from "../assets/images/instagram.svg";
import facebookLogo from "../assets/images/facebook.svg";
import linkedinLogo from "../assets/images/linkedin.svg";
import youtubeLogo from "../assets/images/youtube.svg";
import xLogo from "../assets/images/x.svg";

// Adding Styles
import styles from "./Footer.module.css";

const socials = [
  { href: "https://www.instagram.com/", logo: instagramLogo, name: "Instagram" },
  { href: "https://www.facebook.com/", logo: facebookLogo, name: "Facebook" },
  { href: "https://www.linkedin.com/", logo: linkedinLogo, name: "LinkedIn" },
  { href: "https://www.youtube.com/", logo: youtubeLogo, name: "YouTube" },
  { href: "https://twitter.com/", logo: xLogo, name: "X" },
];

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copyright}>
          <span className={styles.year}>© {new Date().getFullYear()}</span>{" "}
          HomeBrew
        </p>

        <ul className={styles.socials}>
          {socials.map(({ href, logo, name }) => (
            <li key={name}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={`HomeBrew on ${name}`}
              >
                <img className={styles.socialLogo} src={logo} alt="" />
              </a>
            </li>
          ))}
        </ul>

        <ul className={styles.meta}>
          <li>
            <a className={styles.metaLink} href="#careers">
              Careers
            </a>
          </li>
          <li>
            <a className={styles.metaLink} href="#contact">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
