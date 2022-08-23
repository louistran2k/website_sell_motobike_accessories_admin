import loadingStyles from './loading.module.scss';

const Loading = () => {
  return (
    <div className={loadingStyles.loading}>
      <img src="../../../assets/images/loading.jpg" alt="" />
    </div>
  );
};

export default Loading;
