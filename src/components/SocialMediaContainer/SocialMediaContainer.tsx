import styles from "./SocialMediaContainer.module.scss"

type SocialMediaContainerProps = {
    noTopMargin?: boolean
}

export default function SocialMediaContainer({ noTopMargin }: SocialMediaContainerProps) {
    return(
        <div className={`${styles.socialMediaContainer} ${noTopMargin ? styles.noTopMargin : ""}`}>
            <a
                href="https://github.com/heuerleon"
                target="_blank"
                rel="noreferrer"
                aria-label="github"
            >
                <i className="fab fa-github"></i>
            </a>
            <a
                href="https://www.instagram.com/heuerleon/"
                target="_blank"
                rel="noreferrer"
                aria-label="instagram"
            >
                <i className="fab fa-instagram"></i>
            </a>
            <a
                href="https://www.linkedin.com/in/leonheuer/"
                target="_blank"
                rel="noreferrer"
                aria-label="linkedin"
            >
                <i className="fab fa-linkedin"></i>
            </a>
        </div>
    )
}