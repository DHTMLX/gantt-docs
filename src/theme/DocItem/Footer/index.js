import Footer from '@theme-original/DocItem/Footer';
import Admonition from '@theme/Admonition';

export default function FooterWrapper(props) {
  return (
    <>
      <Footer {...props} />
      <Admonition type="info" title="Need help?" className="docusaurus-mt-lg">
        Got a question about the documentation? Reach out to our <a href="https://dhtmlx.com/docs/technical-support.shtml">technical support team </a> for help and guidance. 
        For custom component solutions, visit the <a href="https://dhtmlx.com/docs/services.shtml">Services</a> page.
      </Admonition>
    </>
  );
}
