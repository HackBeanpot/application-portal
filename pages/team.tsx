import React, { ReactElement, useState } from 'react';
import useSWR from 'swr';
import { deleteTeamInfo, getTeamInfo, getUser, updateTeamInfo } from '../common/apiClient';
import { PageLayout } from '../components/Layout';
import { Button, Input, Alert, Card } from 'antd';

const Team = (): ReactElement => {
  const { data: user, mutate: mutateUser } = useSWR('/api/v1/user', getUser);

  const userInfo = user?.data;
  const currentTeamName = userInfo?.teamName;
  const { data: team, mutate: mutateTeam } = useSWR(
    ['/api/v1/team', userInfo?.teamName],
    getTeamInfo
  );

  const [teamName, setTeamName] = useState<string>('');
  const [isTeamInputOpen, setIsTeamInputOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  return (
    <PageLayout currentPage={'team'}>
      <div className="team">
        <h1>Apply with Teammates</h1>
        <Card title="Team Status">
          {userInfo &&
            (currentTeamName == null ? (
              <>
                <Alert
                  className="alert"
                  showIcon
                  message="Applying Individually"
                  description={
                    <>
                      Applying with or without a team does has no effect on how your application is
                      read! However, if you are already part of a team before applying, we will
                      accept / reject your team together.
                    </>
                  }
                />
                <div className="button-container">
                  {isTeamInputOpen ? (
                    <>
                      <Alert
                        className="alert"
                        showIcon
                        message="Team prize Disclaimer"
                        description={
                          <>
                            Applying with or without a team does has no effect on how your
                            application is read! However, if you are already part of a team before
                            applying, we will accept / reject your team together.
                          </>
                        }
                      />
                      <p>
                        To apply as a team, first decide upon a unique team name with your
                        teammates. After deciding, have everyone enter the same team name in the
                        application portal and click {'"Join team"'}. After joining, you will be
                        able to see the current members of the team.
                      </p>
                      <Input
                        className="input"
                        placeholder="Team Name"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        disabled={isUpdating}
                      />
                      <Button
                        type="primary"
                        loading={isUpdating}
                        disabled={teamName === ''}
                        onClick={async () => {
                          setIsUpdating(true);
                          await updateTeamInfo(teamName);
                          await mutateUser();
                          setTeamName('');
                          setIsUpdating(false);
                        }}
                      >
                        Join team
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsTeamInputOpen(true)}>Apply with teammates</Button>
                  )}
                </div>
              </>
            ) : (
              <>
                <Alert
                  className="alert"
                  showIcon
                  message={
                    <>
                      Applying with team <strong>{currentTeamName}</strong>
                    </>
                  }
                  description={
                    <>
                      {team?.data && (
                        <>
                          <i>Current team members:</i>
                          <ul>
                            {team.data.userEmails.map((email: string) => (
                              <li key={email}>{email}</li>
                            ))}
                          </ul>
                        </>
                      )}
                    </>
                  }
                />
                <div className="button-container">
                  <Button
                    loading={isUpdating}
                    danger
                    onClick={async () => {
                      setIsUpdating(true);
                      setIsTeamInputOpen(false);
                      await deleteTeamInfo();
                      await Promise.all([mutateUser(), mutateTeam()]);
                      setIsUpdating(false);
                    }}
                  >
                    Leave Team
                  </Button>
                </div>
              </>
            ))}
        </Card>
      </div>
    </PageLayout>
  );
};

export default Team;
