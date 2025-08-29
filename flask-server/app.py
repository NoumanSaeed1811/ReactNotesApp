from flask import Flask,render_template, request,redirect,jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///notes.db"
db = SQLAlchemy(app)

class Notes(db.Model):
    sno = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(200), nullable = False)
    desc = db.Column(db.String(500), nullable = False)
    date_created = db.Column(db.DateTime, default = datetime.now().replace(microsecond=0))
    def __repr__(self):
        return f"{self.sno} - {self.title}"


from flask import request, jsonify

@app.route("/api/notes", methods=['GET'])
def get_notes():
    notes = Notes.query.all()
    notes_list = []
    for note in notes:
        notes_list.append({
            "sno": note.sno,
            "title": note.title,
            "desc": note.desc,
            "date_created": note.date_created
        })
    return jsonify(notes_list)

@app.route("/api/notes", methods=['POST'])
def add_note():
    data = request.get_json()
    new_note = Notes(title=data['title'], desc=data['desc'])
    db.session.add(new_note)
    db.session.commit()
    return jsonify({"message": "Note added successfully!"}), 201

@app.route("/api/notes/<int:sno>", methods=['DELETE'])
def delete_note(sno):
    note = Notes.query.filter_by(sno=sno).first()
    if not note:
        return jsonify({"error": "Note not found"}), 404
    
    db.session.delete(note)
    db.session.commit()
    return jsonify({"message": "Note deleted successfully!"}), 200

# get single note
@app.route("/note/<int:sno>", methods=["GET"])
def get_note(sno):
    note = Notes.query.filter_by(sno=sno).first()
    if not note:
        return {"error": "Note not found"}, 404
    return {
        "sno": note.sno,
        "title": note.title,
        "desc": note.desc
    }

# update note
@app.route("/update/<int:sno>", methods=["PUT"])
def update(sno):
    data = request.get_json()   # React se JSON milega
    title = data.get("title")
    desc = data.get("desc")

    note = Notes.query.filter_by(sno=sno).first()
    if not note:
        return {"error": "Note not found"}, 404

    note.title = title
    note.desc = desc
    db.session.commit()

    return {"message": "Note updated successfully"}


if __name__ == "__main__":
    app.run(debug=True)