import getSteamGames from '@/lib/steam';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

const formatPlaytime = (playtime: number): string => {
  const hours = Math.floor(playtime / 60);
  const minutes = playtime % 60;

  return `${hours}h ${minutes}m`;
};

const Home = async (): Promise<ReactNode> => {
  const games = await getSteamGames();
  const totalPlaytime = games.reduce((acc, game) => acc + game.playtime, 0);
  const totalHours = Math.floor(totalPlaytime / 60);
  const totalAchievements = games.reduce(
    (acc, { achievements }) => acc + achievements.achieved,
    0
  );
  const perfectGames = games.filter(
    (game) =>
      game.achievements.total > 0 &&
      game.achievements.achieved === game.achievements.total
  );
  return (
    <div className="container grid gap-[3vw] py-24 px-16">
      <div className="grid gap-[1vw] text-[3vw] text-neutral-900">
        <p>
          I have {totalHours} hours of tracked playtime, {totalAchievements}{' '}
          achievements across {games.length} games and {perfectGames.length}{' '}
          perfect games
          <sup className="text-neutral-500 dark:text-neutral-400">1</sup>.
        </p>
        <p>
          Follow me on{' '}
          <Link
            className="underline"
            href="https://steamcommunity.com/id/0x_crusader/"
          >
            Steam
          </Link>
          .
        </p>
      </div>
      <div>
        {games.map((game) => (
          <Link
            key={game.id}
            id={String(game.id)}
            className="flex items-center justify-between gap-[1vw] border-b border-neutral-200 py-[1vw]"
            href={`https://steamcommunity.com/app/${game.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex items-center gap-[1vw]">
              <Image
                src={game.icon}
                width={32}
                height={32}
                className="h-[3vw] w-[3vw] shrink-0 rounded"
                alt=""
              />
              <p className="text-[1.5vw] text-neutral-900">{game.name}</p>
            </div>
            <p className="text-[1.5vw] text-neutral-900">
              {formatPlaytime(game.playtime)}
            </p>
          </Link>
        ))}
      </div>
      <hr />
      <p className="text-[1vw] text-zinc-500 dark:text-zinc-400">
        <sup>1</sup> A perfect game is one where you&apos;ve wasted so much
        time, you&apos;ve managed to complete the entire game and collect all
        achievements.
      </p>
    </div>
  );
};

export default Home;
