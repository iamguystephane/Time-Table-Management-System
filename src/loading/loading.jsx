import style from './loading.module.css'

const Loading = () => {
    return (
        <div className={style.loadingContainer}>
            <div className={style.loading}> </div>
            <p> Fetching data </p>
        </div>
    )
}

export default Loading;