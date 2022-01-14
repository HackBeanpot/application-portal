import React, { useState } from 'react';
import { ADMIN_TABS } from '../../common/constants';
import useSWR from 'swr';
import {
  getConfirmBy,
  getRegistrationClosed,
  getRegistrationOpen,
  getShowDecision,
  updateConfirmBy,
  updateRegistrationClosed,
  updateRegistrationOpen,
  updateShowDecision,
} from '../../common/apiClient';
import { Col, Row, Spin, Switch } from 'antd';
import PortalSettingsRow from './PortalSettingsRow';

const getShowDecisionData = () => getShowDecision().then((d) => d.data);

const PortalSettings: React.FC = () => {
  const { data: confirmBy, mutate: mutateConfirmBy } = useSWR(
    '/api/v1/dates/confirm-by',
    getConfirmBy
  );
  const { data: registrationClosed, mutate: mutateRegistrationClosed } = useSWR(
    '/api/v1/dates/registration-closed',
    getRegistrationClosed
  );
  const { data: registrationOpen, mutate: mutateRegistrationOpen } = useSWR(
    '/api/v1/dates/registration-open',
    getRegistrationOpen
  );
  const { data: showDecision, mutate: mutateShowDecision } = useSWR(
    '/api/v1/dates/registration-open',
    getShowDecisionData
  );

  const [myRegistrationOpen, setMyRegistrationOpen] = useState<string | undefined>(undefined);
  const [myRegistrationClosed, setMyRegistrationClosed] = useState<string | undefined>(undefined);
  const [myConfirmBy, setMyConfirmBy] = useState<string | undefined>(undefined);
  const loading = !confirmBy || !registrationClosed || !registrationOpen || !showDecision;
  return (
    <div>
      <h3>{ADMIN_TABS.CONFIGURE_PORTAL_SETTINGS}</h3>
      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          <Row>
            <Col span={4}>Name</Col>
            <Col span={8}>Current Date</Col>
            <Col span={8}>Picker</Col>
            <Col span={4}>Update</Col>
          </Row>
          <PortalSettingsRow
            title="Registration Open"
            portalDate={registrationOpen.data}
            setDate={setMyRegistrationOpen}
            postDate={updateRegistrationOpen}
            uiStateDate={myRegistrationOpen}
            refresh={mutateRegistrationOpen}
          />
          <PortalSettingsRow
            title="Registration Close"
            portalDate={registrationClosed.data}
            setDate={setMyRegistrationClosed}
            postDate={updateRegistrationClosed}
            uiStateDate={myRegistrationClosed}
            refresh={mutateRegistrationClosed}
          />
          <PortalSettingsRow
            title="Confirm-by"
            portalDate={confirmBy.data}
            setDate={setMyConfirmBy}
            postDate={updateConfirmBy}
            uiStateDate={myConfirmBy}
            refresh={mutateConfirmBy}
          />
          <div className="showDecisions">
            Show Decisions
            <Switch
              checked={showDecision}
              onClick={(value) => {
                updateShowDecision(value);
                mutateShowDecision(value, true);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};
export default PortalSettings;
