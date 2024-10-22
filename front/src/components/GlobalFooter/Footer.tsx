import { component$, Slot } from "@builder.io/qwik"

export default component$(() => {
  return (
    <div class="rps-footer">
      <div class="grid font-7 gap10">
        <div class="ma">
          <div class="flex justify-center gap10 ">
            <div>
              <a href="#">Contact Us</a>
            </div>
            <div>
              <a href="#">Become an Advertizer</a>
            </div>
            <div>
              <a href="#">Content Partnership</a>
            </div>
            <div>
              <a href="#">DMCA Complaint</a>
            </div>
          </div>
        </div>

        <div class="ma">
          <div class="grid">
            <span class="ma">The site contains sexually explicit material. </span>
            <span class="ma">Enter ONLY if you are at least 18 years old and agree to our cookie rules.</span>
          </div>
        </div>

        <div class="ma">
          <div class="flex justify-center gap10 ">
            <div>
              <a href="#">Terms of Service</a>
            </div>
            <div>
              <a href="#">Privacy Notice</a>
            </div>
            <div>
              <a href="#">Cookie Policy</a>
            </div>
            <div>
              <a href="#">Parental Controls</a>
            </div>
            <div>
              <a href="#">Child Sexual Abuse Material Policy</a>
            </div>
            <div>
              <a href="#">Non-Consensual Content Policy</a>
            </div>
          </div>
        </div>
        <div class="ma">© 2024 aknm.nl - All Rights Reserved!</div>
      </div>
    </div>
  )
})
