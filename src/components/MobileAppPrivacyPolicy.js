import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from './landingpage/mui/Typography';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';

//analytics
import { logPageView } from './Analytics';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1
  },
  paper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  container: {
    marginLeft: '1rem',
    marginBottom: theme.spacing(5),
    justify: 'center',
    position: 'relative'
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5)
  },
});

function PrivacyPolicy(props) {
  const { classes } = props;

  useEffect(() => {
    logPageView();
  }, []);

  return (
    <Paper className={classes.paper}>
      <section className={classes.root}>
        <Grid spacing={2} className={classes.container}>
          <Grid item>
            <Typography variant="h6">Privacy Policy of Future Hope</Typography>
            <Typography component="p" variant="p" gutterBottom>
              <ListItem>
                Future Hope operates the futurehopeschool.com website, which provides the SERVICE. This
                page is used to inform website visitors regarding our policies with the collection, use,
                and disclosure of Personal Information if anyone decided to use our Service, the Future
                Hope School in the Sky website. If you choose to use our Service, then you agree to the
                collection and use of information in relation with this policy. The Personal Information
                that we collect are used for providing and improving the Service. We will not use or
								share your information with anyone except as described in this Privacy Policy.<br />
								The terms used in this Privacy Policy have the same meanings as in our Terms and
								Conditions, which is accessible at futurehopeschool.com, unless otherwise defined in
								this Privacy Policy.
							</ListItem>
            </Typography>
          </Grid>

          <Grid item>
            <Typography variant="h6">Information Collection and Use</Typography>
            <Typography component="p" variant="p" gutterBottom>
              <ListItem>
                For a better experience while using our Service, we may require you to provide us with
                certain personally identifiable information, including but not limited to your name,
                phone number, and postal address. The information that we collect will be used to
                contact or identify you.
							</ListItem>
            </Typography>
            <Typography variant="h6">Log Data</Typography>
            <Typography component="p" variant="p" gutterBottom>
              <ListItem>
                We want to inform you that whenever you visit our Service, we collect information that
                your browser sends to us that is called Log Data. This Log Data may include information
                such as your computer’s Internet Protocol ("IP") address, browser version, pages of our
                Service that you visit, the time and date of your visit, the time spent on those pages,
                and other statistics.
							</ListItem>
            </Typography>
            <Typography variant="h6">Cookies</Typography>
            <Typography component="p" variant="p" gutterBottom>
              <ListItem>
                Cookies are files with small amount of data that is commonly used an anonymous unique
                identifier. These are sent to your browser from the website that you visit and are
								stored on your computer’s hard drive.<br />
								Our website uses these "cookies" to collection information and to improve our Service.
								You have the option to either accept or refuse these cookies, and know when a cookie is
								being sent to your computer. If you choose to refuse our cookies, you may not be able to
								use some portions of our Service.
							</ListItem>
              For more general information on cookies, please read {' '}
              <a href="https://www.cookieconsent.com/what-are-cookies/">"What Are Cookies"</a>.
            </Typography>

            <Typography variant="h6">Service Providers</Typography>
            <Typography component="p" variant="p" gutterBottom>
              <ListItem>
                We may employ third-party companies and individuals due to the following reasons:
							</ListItem>
              <ul>
                <li>To facilitate our Service;</li>
                <li>To provide the Service on our behalf;</li>
                <li>To perform Service-related services; or</li>
                <li>To assist us in analyzing how our Service is used.</li>
              </ul>
              <ListItem>
                We want to inform our Service users that these third parties have access to your
                Personal Information. The reason is to perform the tasks assigned to them on our behalf.
                However, they are obligated not to disclose or use the information for any other
                purpose.
							</ListItem>
            </Typography>
            <Typography variant="h6">Security</Typography>
            <Typography component="p" variant="p" gutterBottom>
              <ListItem>
                We value your trust in providing us your Personal Information, thus we are striving to
                use commercially acceptable means of protecting it. But remember that no method of
                transmission over the internet, or method of electronic storage is 100% secure and
                reliable, and we cannot guarantee its absolute security.
							</ListItem>
            </Typography>
            <Typography variant="h6">Links to Other Sites</Typography>
            <Typography component="p" variant="p" gutterBottom>
              <ListItem>
                Our Service may contain links to other sites. If you click on a third-party link, you
                will be directed to that site. Note that these external sites are not operated by us.
                Therefore, we strongly advise you to review the Privacy Policy of these websites. We
                have no control over, and assume no responsibility for the content, privacy policies, or
                practices of any third-party sites or services.
							</ListItem>
            </Typography>
            <Typography variant="h6">Children's Privacy</Typography>
            <Typography component="p" variant="p" gutterBottom>
              <ListItem>
                Our Services do not address anyone under the age of 13. We do not knowingly collect
                personal identifiable information from children under 13. In the case we discover that a
                child under 13 has provided us with personal information, we immediately delete this
                from our servers. If you are a parent or guardian and you are aware that your child has
                provided us with personal information, please contact us so that we will be able to do
                necessary actions.
							</ListItem>
            </Typography>
            <Typography variant="h6">Changes to This Privacy Policy</Typography>
            <Typography component="p" variant="p" gutterBottom>
              <ListItem>
                We may update our Privacy Policy from time to time. Thus, we advise you to review this
                page periodically for any changes. We will notify you of any changes by posting the new
                Privacy Policy on this page. These changes are effective immediately, after they are
                posted on this page.
							</ListItem>
            </Typography>
            <Typography variant="h6">Contact Us</Typography>
            <Typography component="p" variant="p" gutterBottom>
              <ListItem>
                If you have any questions or suggestions about our Privacy Policy, do not hesitate to
                contact us.
							</ListItem>
                Our Privacy Policy was created with the help of the{' '}
              <a href="https://www.privacypolicytemplate.net">Privacy Policy Template</a> and the{' '}
              <a href="https://www.disclaimergenerator.org/">Disclaimer Generator</a>.
            </Typography>
          </Grid>
        </Grid>
      </section>
    </Paper >
  );
}

PrivacyPolicy.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PrivacyPolicy);
