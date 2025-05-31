<template>
  <section class="newsletter-custom-section">
    <div class="container">
      <div class="warning-header">
        <span class="warning-icon">⚠️</span>
        <p class="warning-text-main">THE AI SHIFT IS ACCELERATING</p>
        <p class="warning-text-sub">Don't Get Left in the Digital Dust</p>
      </div>

      <p class="description-text">
        Every week, breakthroughs redefine what's possible. Miss an update, and you miss the future. <strong class="gap-text">The gap between the informed and the obsolete is widening daily.</strong>
        <br><br>
        Root Access AI is your <strong class="essential-weekly">essential weekly briefing</strong>. We decode the chaos, filter the noise, and deliver the critical intelligence you need to not just survive, but <strong class="dominate">dominate</strong> in the age of AI.
        <br><br>
        If you're a builder, hacker, founder, or visionary, this isn't just another newsletter – it's your <strong class="lifeline">lifeline</strong>. Ignorance is no longer bliss; it's a liability.
      </p>

      <h2 class="cta-main">SECURE YOUR INTEL. PLUG IN.</h2>
      <p class="cta-sub">Drop your email. Stay ahead. Stay alive (metaphorically... mostly).</p>

      <!-- MailerLite Form -->
      <div id="mlb2-26667396" class="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-26667396">
        <div class="ml-form-align-center">
          <div class="ml-form-embedWrapper embedForm">
            <div class="ml-form-embedBody ml-form-embedBodyHorizontal row-form">
              <div class="ml-form-embedContent" style="display: none;">
                <h4>Newsletter</h4>
                <p>Stay ahead of the curve get the rootaccess newsletter now & learn all about AI agents</p>
              </div>

              <form class="ml-block-form" action="https://assets.mailerlite.com/jsonp/1312118/forms/155930033087579254/subscribe" data-code="" method="post" target="_blank">
                <div class="ml-form-formContent horozintalForm">
                  <div class="ml-form-horizontalRow">
                    <div class="ml-input-horizontal">
                      <div style="width: 100%;" class="horizontal-fields">
                        <div class="ml-field-group ml-field-email ml-validate-email ml-validate-required">
                          <input type="email" class="form-control" data-inputmask="" name="fields[email]" placeholder="YOUR_EMAIL@DOMAIN.CO" autocomplete="email">
                        </div>
                      </div>
                    </div>
                    <div class="ml-button-horizontal primary">
                      <button type="submit" class="primary">JACK IN ⚡️</button>
                      <button disabled="disabled" style="display: none;" type="button" class="loading">
                        <div class="ml-form-embedSubmitLoad"></div>
                        <span class="sr-only">Loading...</span>
                      </button>
                    </div>
                  </div>
                </div>

                <input type="hidden" name="ml-submit" value="1">
                
                <div class="ml-mobileButton-horizontal">
                  <button type="submit" class="primary">JACK IN ⚡️</button>
                  <button disabled="disabled" style="display: none;" type="button" class="loading">
                    <div class="ml-form-embedSubmitLoad"></div>
                    <span class="sr-only">Loading...</span>
                  </button>
                </div>
                <input type="hidden" name="anticsrf" value="true">
              </form>
            </div>

            <div class="ml-form-successBody row-success" style="display: none">
              <div class="ml-form-successContent">
                <h4>Thank you!</h4>
                <p>You have successfully joined our subscriber list.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p class="disclaimer-text">
        We guard your data like a mainframe. No spam, just pure, unadulterated AI intel.
      </p>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

let mailerliteScript = null;
let mailerliteFontLink = null;

onMounted(() => {
  window.ml_webform_success_26667396 = function() {
    const $ = window.ml_jQuery || window.jQuery;
    if ($) {
      const formWrapper = document.querySelector('.ml-subscribe-form-26667396');
      if (formWrapper) {
          const successRow = formWrapper.querySelector('.row-success');
          const formRow = formWrapper.querySelector('.row-form');
          if (successRow) successRow.style.display = 'block';
          if (formRow) formRow.style.display = 'none';
      }
    } else {
      console.error("MailerLite jQuery not found for success callback.");
    }
  };

  if (!document.getElementById('mailerlite-webforms-script')) {
    mailerliteScript = document.createElement('script');
    mailerliteScript.src = 'https://groot.mailerlite.com/js/w/webforms.min.js?v176e10baa5e7ed80d35ae235be3d5024';
    mailerliteScript.type = 'text/javascript';
    mailerliteScript.async = true;
    mailerliteScript.id = 'mailerlite-webforms-script';
    document.body.appendChild(mailerliteScript);

    mailerliteScript.onload = () => {
      fetch("https://assets.mailerlite.com/jsonp/1312118/forms/155930033087579254/takel")
        .catch(error => console.warn("MailerLite takel fetch error:", error));
    };
  }

  if (!document.getElementById('mailerlite-fonts-style')) {
    mailerliteFontLink = document.createElement('link');
    mailerliteFontLink.rel = 'stylesheet';
    mailerliteFontLink.type = 'text/css';
    mailerliteFontLink.href = 'https://assets.mlcdn.com/fonts.css?version=1748530';
    mailerliteFontLink.id = 'mailerlite-fonts-style';
    document.head.appendChild(mailerliteFontLink);
  }
});

onUnmounted(() => {
  if (typeof window.ml_webform_success_26667396 === 'function') {
    delete window.ml_webform_success_26667396;
  }
});
</script>

<style scoped>
.newsletter-custom-section {
  background-color: #1a1f2c; 
  padding: 30px 20px;
  color: #e0e0e0; 
  text-align: center;
  font-family: 'Inter', Arial, sans-serif;
  border-top: 3px solid #00ff99; 
  border-bottom: 3px solid #00ff99;
  margin: 10px 0;
}

.newsletter-custom-section .container {
  max-width: 700px;
  margin: 0 auto;
}

.warning-header {
  margin-bottom: 15px;
}

.warning-icon {
  font-size: 2em;
  color: #ffd700; 
  display: block;
  margin-bottom: 5px;
}

.warning-text-main {
  font-size: 1.2em;
  font-weight: bold;
  color: #00ff99; 
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-family: 'Orbitron', sans-serif;
  margin: 0;
}

.warning-text-sub {
  font-size: 0.9em;
  color: #ff4d4d; 
  font-style: italic;
  margin: 0;
}

.description-text {
  font-size: 0.95em;
  line-height: 1.5;
  margin-bottom: 15px;
  color: #c0c0c0; 
}

.description-text strong { font-weight: bold; }
.description-text .gap-text { color: #ff4d4d; }
.description-text .essential-weekly { color: #00ff99; }
.description-text .dominate { color: #ffd700; }
.description-text .lifeline { color: #ff4d4d; }

.cta-main {
  font-size: 1.6em;
  font-weight: bold;
  color: #00ff99; 
  text-transform: uppercase;
  margin-bottom: 5px;
  letter-spacing: 1px;
  font-family: 'Orbitron', sans-serif;
}

.cta-sub {
  font-size: 0.9em;
  margin-bottom: 15px;
  color: #a0a0a0;
}

.disclaimer-text {
  font-size: 0.8em;
  color: #888;
  margin-top: 15px;
  font-style: italic;
}

/* MailerLite Base CSS with :deep() */
:deep(.ml-form-embedSubmitLoad) {
  display: inline-block;
  width: 20px;
  height: 20px;
}

:deep(.g-recaptcha) {
  transform: scale(1);
  -webkit-transform: scale(1);
  transform-origin: 0 0;
  -webkit-transform-origin: 0 0;
}

:deep(.sr-only) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  border: 0;
}

:deep(.ml-form-embedSubmitLoad:after) {
  content: " ";
  display: block;
  width: 11px;
  height: 11px;
  margin: 1px;
  border-radius: 50%;
  border: 4px solid #fff;
  border-color: #000 #000 #000 transparent;
  animation: ml-form-embedSubmitLoad 1.2s linear infinite;
}

@keyframes ml-form-embedSubmitLoad {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

:deep(#mlb2-26667396.ml-form-embedContainer) {
  box-sizing: border-box;
  display: table;
  margin: 0 auto;
  position: static;
  width: 100% !important;
}

:deep(#mlb2-26667396.ml-form-embedContainer h4),
:deep(#mlb2-26667396.ml-form-embedContainer p),
:deep(#mlb2-26667396.ml-form-embedContainer span),
:deep(#mlb2-26667396.ml-form-embedContainer button) {
  text-transform: none !important;
  letter-spacing: normal !important;
}

:deep(#mlb2-26667396.ml-form-embedContainer .ml-form-embedWrapper) {
  background-color: transparent !important;
  border-width: 0px;
  border-color: transparent;
  border-radius: 4px;
  border-style: solid;
  box-sizing: border-box;
  display: inline-block !important;
  margin: 0;
  padding: 0;
  position: relative;
}

:deep(#mlb2-26667396.ml-form-embedContainer .ml-form-embedWrapper.embedPopup),
:deep(#mlb2-26667396.ml-form-embedContainer .ml-form-embedWrapper.embedDefault) { 
  width: 600px; 
}

:deep(#mlb2-26667396.ml-form-embedContainer .ml-form-embedWrapper.embedForm) { 
  max-width: 600px; 
  width: 100%; 
}

:deep(#mlb2-26667396.ml-form-embedContainer .ml-form-align-center) { 
  text-align: center; 
}

:deep(#mlb2-26667396.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody),
:deep(#mlb2-26667396.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody) {
  padding: 0 !important;
}

:deep(#mlb2-26667396.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedContent),
:deep(#mlb2-26667396.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody .ml-form-successContent) {
  text-align: left;
  margin: 0 0 20px 0;
}

:deep(#mlb2-26667396.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody form) {
  margin: 0;
  width: 100%;
}

:deep(#mlb2-26667396.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-formContent.horozintalForm) {
  margin: 0;
  padding: 0;
  width: 100%;
  height: auto;
  float: left;
}

:deep(#mlb2-26667396.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow) {
  height: auto;
  width: 100%;
  float: left;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

:deep(.ml-form-formContent.horozintalForm .ml-form-horizontalRow .ml-input-horizontal) { 
  width: 100% !important; 
  float: none !important; 
}

:deep(.ml-form-formContent.horozintalForm .ml-form-horizontalRow .ml-button-horizontal) { 
  width: 100% !important; 
  float: none !important; 
}

:deep(#mlb2-26667396.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow input) {
  background-color: #2a2a2a !important;
  color: #e0e0e0 !important;
  border-color: #004d33 !important;
  border-radius: 4px !important;
  border-style: solid !important;
  border-width: 1px !important;
  font-family: 'Inter', Arial, sans-serif !important;
  font-size: 14px !important;
  line-height: 20px !important;
  margin-bottom: 0;
  margin-top: 0;
  padding: 12px 15px !important;
  width: 100% !important;
  box-sizing: border-box !important;
  text-align: center !important;
}

:deep(#mlb2-26667396.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow input::placeholder) {
  color: #777 !important;
  text-align: center !important;
}

:deep(#mlb2-26667396.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow button) {
  background-color: #00ff99 !important;
  border-color: #00ff99 !important;
  border-style: solid !important;
  border-width: 1px !important;
  border-radius: 4px !important;
  box-shadow: none !important;
  color: #000 !important;
  cursor: pointer;
  font-family: 'Inter', Arial, sans-serif !important;
  font-size: 16px !important;
  font-weight: 700 !important;
  line-height: 20px !important;
  margin: 0 !important;
  padding: 12px 20px !important;
  width: 100% !important;
  height: auto;
  text-transform: uppercase !important;
}

:deep(#mlb2-26667396.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow button:hover) {
  background-color: #00cca3 !important;
  border-color: #00cca3 !important;
}

:deep(.ml-mobileButton-horizontal) { 
  display: none; 
}

:deep(#mlb2-26667396.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow),
:deep(#mlb2-26667396.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedPermissions),
:deep(#mlb2-26667396.ml-form-embedContainer .ml-form-embedWrapper .ml-form-recaptcha),
:deep(#mlb2-26667396.ml-form-embedContainer .g-recaptcha) {
  display: none !important;
}

:deep(#mlb2-26667396.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedContent) {
  display: none !important;
}

:deep(#mlb2-26667396.ml-form-embedContainer .ml-form-successBody .ml-form-successContent h4) {
  display: block !important;
  color: #00ff99 !important;
  font-size: 1.6em !important;
  margin-bottom: 10px !important;
  font-family: 'Orbitron', sans-serif !important;
  text-align: center !important;
}

:deep(#mlb2-26667396.ml-form-embedContainer .ml-form-successBody .ml-form-successContent p) {
  display: block !important;
  color: #ccc !important;
  font-size: 1em !important;
  text-align: center !important;
}

:deep(.ml-error input), 
:deep(.ml-error textarea), 
:deep(.ml-error select) {
  border-color: red !important;
}

@media only screen and (max-width: 600px) {
  .newsletter-custom-section {
    padding: 20px 15px;
  }
  
  .warning-text-main {
    font-size: 1.1em;
  }
  
  .cta-main {
    font-size: 1.4em;
  }
  
  .description-text {
    font-size: 0.9em;
  }
  
  :deep(.ml-form-embedWrapper.embedDefault), 
  :deep(.ml-form-embedWrapper.embedPopup) { 
    width: 100% !important; 
  }
  
  :deep(.ml-mobileButton-horizontal) { 
    display: block !important; 
    margin-bottom: 0 !important;
    width: 100% !important; 
  }
  
  :deep(.ml-form-formContent.horozintalForm .ml-form-horizontalRow .ml-button-horizontal) { 
    display: none !important; 
  }
}
</style> 