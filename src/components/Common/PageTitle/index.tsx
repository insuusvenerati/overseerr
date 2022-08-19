import useSettings from '../../../hooks/useSettings';
import Head from 'next/head';
import PullToRefresh from '../../PullToRefresh';

interface PageTitleProps {
  title: string | (string | undefined)[];
}

const PageTitle = ({ title }: PageTitleProps) => {
  const settings = useSettings();

  const titleText = `${
    Array.isArray(title) ? title.filter(Boolean).join(' - ') : title
  } - ${settings.currentSettings.applicationTitle}`;

  return (
    <>
      <PullToRefresh />
      <Head>
        <title>{titleText}</title>
      </Head>
    </>
  );
};

export default PageTitle;
