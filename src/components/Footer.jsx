// Importing Logos
import instagramLogo from "../assets/images/instagram.svg";
import facebookLogo from "../assets/images/facebook.svg";
import linkedinLogo from "../assets/images/linkedin.svg";
import youtubeLogo from "../assets/images/youtube.svg";
import xLogo from "../assets/images/x.svg";

// Adding Styles
import styles from "./Footer.module.css";

/**
 * Social destinations. Placeholder profile links — they point at each network's
 * home page, not at a HomeBrew account.
 *
 * @type {{href: string, logo: string, name: string}[]}
 */
const socials = [
  { href: "https://www.instagram.com/", logo: instagramLogo, name: "Instagram" },
  { href: "https://www.facebook.com/", logo: facebookLogo, name: "Facebook" },
  { href: "https://www.linkedin.com/", logo: linkedinLogo, name: "LinkedIn" },
  { href: "https://www.youtube.com/", logo: youtubeLogo, name: "YouTube" },
  { href: "https://twitter.com/", logo: xLogo, name: "X" },
];

/**
 * The site footer: copyright, social links and secondary links.
 * Rendered once by `App.jsx`, outside the routes.
 *
 * The `Careers` and `Contact` links point at in-page anchors that do not exist;
 * they are placeholders for pages the app does not have.
 *
 * @returns {JSX.Element}
 */
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
