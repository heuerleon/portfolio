import Link from "next/link"
import styles from "./Button.module.scss"
import { MouseEventHandler } from "react"

type ButtonProps = {
    href?: string,
    primary?: boolean,
    large?: boolean,
    onClick?: MouseEventHandler<HTMLButtonElement>,
    children: React.ReactNode
}

export default function Button({ href, primary, large, onClick, children }: ButtonProps) {
    if (href) {
        return (
            <Link href={href} className={`${styles.btn} ${primary ? styles.btnPrimary : styles.btnAlt} ${large ? styles.btnLarge : ""}`}>
                {children}
            </Link>
        )
    }

    return (
        <button className={`${styles.btn} ${primary ? styles.btnPrimary : styles.btnAlt} ${large ? styles.btnLarge : ""}`} onClick={onClick}>
            {children}
        </button>
    )
}