// save changes on edit profile page
let saveChanges = async () => {
    console.log("test")
    let fullName = document.getElementById("full_name").value
    let major = document.getElementById("major").value
    let profession = document.getElementById("profession").value
    let interests = document.getElementById("interests").value

    // prevent empty values in db
    if (fullName === '') {fullName = "N/A"}
    if (major === '') {major = "N/A"}
    if (profession === '') {profession = "N/A"}
    if (interests === '') {interests = "N/A"}

    try {
        let response = await fetch(`/users/profile/update`, {
            method: "PUT",
            body: JSON.stringify({ 
                full_name: fullName,
                major: major,
                profession: profession,
                interest: interests

            }),
            headers: { 'Content-Type': 'application/json' }
        })
        let responesJSON = await response.json();
        console.log("success")
        document.getElementById("confirmProfChanges").innerText = "Profile Updated"
        if (responesJSON.status == "error") {
            console.log("error:" + responesJSON.error);
        }
    } catch (error) {
        console.log(error)
        document.getElementById("confirmProfChanges").innerText = error
    }
}