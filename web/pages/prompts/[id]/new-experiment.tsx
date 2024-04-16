import { User } from "@supabase/auth-helpers-react";
import { GetServerSidePropsContext } from "next";

import { ReactElement } from "react";
import AuthLayout from "../../../components/layout/authLayout";
import PromptIdPage from "../../../components/templates/prompts/id/promptIdPage";
import { SupabaseServerWrapper } from "../../../lib/wrappers/supabase";
import PromptNewExperimentPage from "../../../components/templates/prompts/id/promptNewExperiment";

interface PlaygroundProps {
  user: User;
  id: string;
}

const Prompts = (props: PlaygroundProps) => {
  const { user, id } = props;

  return <PromptNewExperimentPage id={id} />;
};

export default Prompts;

Prompts.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const supabase = new SupabaseServerWrapper(context).getClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  // get the id from the query params
  const id = context.params?.id as string;

  return {
    props: {
      initialSession: session,
      user: session.user,
      id,
    },
  };
};
