import { GithubLogoIcon, InstagramLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react/dist/ssr"
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
                <GithubLogoIcon className="pointer-icon" />
            </a>
            <a
                href="https://www.instagram.com/heuerleon/"
                target="_blank"
                rel="noreferrer"
                aria-label="instagram"
            >
                <InstagramLogoIcon className="pointer-icon" />
            </a>
            <a
                href="https://www.linkedin.com/in/leonheuer/"
                target="_blank"
                rel="noreferrer"
                aria-label="linkedin"
            >
                <LinkedinLogoIcon className="pointer-icon" />
            </a>
        </div>
    )
}