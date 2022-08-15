import React from 'react';
import { useInView } from 'react-intersection-observer';
import useSWR from 'swr';
import TitleCard from '.';
import type { MovieDetails } from '../../../server/models/Movie';
import type { TvDetails } from '../../../server/models/Tv';

type TmdbTitleCardProps = {
  tmdbId: number;
  type: 'movie' | 'tv';
  canExpand?: boolean;
};

const isMovie = (movie: MovieDetails | TvDetails): movie is MovieDetails => {
  return (movie as MovieDetails).title !== undefined;
};

const TmdbTitleCard = ({ tmdbId, type, canExpand }: TmdbTitleCardProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });
  const url =
    type === 'movie' ? `/api/v1/movie/${tmdbId}` : `/api/v1/tv/${tmdbId}`;
  const { data: title, error } = useSWR<MovieDetails | TvDetails>(
    inView ? `${url}` : null
  );

  if (!title && !error) {
    return (
      <div ref={ref}>
        <TitleCard.Placeholder canExpand={canExpand} />
      </div>
    );
  }

  if (!title) {
    return <TitleCard.Placeholder canExpand={canExpand} />;
  }

  return isMovie(title) ? (
    <TitleCard
      id={title.id}
      image={title.posterPath}
      status={title.mediaInfo?.status}
      summary={title.overview}
      title={title.title}
      userScore={title.voteAverage}
      year={title.releaseDate}
      mediaType={'movie'}
      canExpand={canExpand}
    />
  ) : (
    <TitleCard
      id={title.id}
      image={title.posterPath}
      status={title.mediaInfo?.status}
      summary={title.overview}
      title={title.name}
      userScore={title.voteAverage}
      year={title.firstAirDate}
      mediaType={'tv'}
      canExpand={canExpand}
    />
  );
};

export default TmdbTitleCard;
