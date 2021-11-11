import React, { ReactElement, useState } from 'react';
import useSWR from 'swr';
import {
  deleteTeamInfo,
  getTeamInfo,
  getUser,
  updateTeamInfo,
} from '../common/apiClient';
import { PageLayout } from '../components/Layout';
import { Button, Spin, Input } from 'antd';

const Team = (): ReactElement => {
  const { data: user, mutate } = useSWR('/api/v1/user', getUser);

  const userInfo = user?.data;
  const currentTeamName = userInfo?.teamName;
  const { data: team, mutate: mutateTeam } = useSWR(
    ['/api/v1/team', userInfo?.teamName],
    (_url, teamName) => getTeamInfo(teamName)
  );

  const [teamName, setTeamName] = useState<string>('');

  return (
    <PageLayout currentPage={'team'}>
      <div>
        <h1>Welcome to Team Formation!</h1>
        {userInfo == null ? (
          <Spin size="large" />
        ) : currentTeamName == null ? (
          <div>
            <h2>You do not have a team yet!</h2>
            <div>
              <h2>Enter a team name</h2>
              <Input
                style={{ marginBottom: '20px' }}
                placeholder={'team name'}
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
              <Button
                color="primary"
                disabled={teamName === ''}
                onClick={async () => {
                  await updateTeamInfo(teamName, userInfo.email),
                    await mutate(),
                    await setTeamName('');
                }}
              >
                Join team
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <h2>Your team name is &quot;{currentTeamName}&quot;</h2>
            {team?.data == null ? (
              <Spin size="large" />
            ) : (
              <div>
                <h3>Your teammates are:</h3>
                {team.data.userEmails.map((email: string) => {
                  return <h4 key={email}>{email}</h4>;
                })}
              </div>
            )}
            <Button
              onClick={async () => {
                await deleteTeamInfo(currentTeamName, userInfo.email),
                  await mutate(),
                  await mutateTeam();
              }}
            >
              Leave Team
            </Button>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Team;
